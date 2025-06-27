import Nat "mo:base/Nat";
import Array "mo:base/Array";
import Principal "mo:base/Principal";

actor {
  type UserId = Principal;

  type UserRole = {
    #Provider;
    #Seeker;
    #Both;
  };

  type User = {
    id: UserId;
    name: Text;
    email: Text;
    role: UserRole;
    servicesOffered: [Nat];
    servicesRequested: [Nat];
    address: Text
  };

  type Service = {
    id: Nat;
    title: Text;
    description: Text;
    category: Text;
    price: Float;
    providerId: UserId;
    available: Bool;
  };

  type RequestStatus = {
    #Pending;
    #Accepted;
    #Rejected;
    #Completed;
  };

  type ServiceRequest = {
    id: Nat;
    serviceId: Nat;
    seekerId: UserId;
    providerId: UserId;
    message: Text;
    status: RequestStatus;
  };

  // ---------- Storage ----------
  var users: [User] = [];
  var services: [Service] = [];
  var requests: [ServiceRequest] = [];

  var serviceIdCounter: Nat = 0;
  var requestIdCounter: Nat = 0;

  // ---------- User Functions ----------

  public func registerUser(name: Text, email: Text, role: UserRole): async Text {
    let caller = Principal.fromActor(this);
    // Check if already registered
    let existing = Array.find<User>(users, func(u) { u.id == caller });
    switch (existing) {
      case (null) {
        let newUser: User = {
          id = caller;
          name;
          email;
          role;
          servicesOffered = [];
          servicesRequested = [];
        };
        users := Array.append(users, [newUser]);
        "User registered successfully."
      };
      case (_) {
        "User already registered."
      };
    };
  };

  // ---------- Service Functions ----------

  public func addService(title: Text, description: Text, category: Text, price: Float): async Nat {
    let caller = Principal.fromActor(this);

    let newService: Service = {
      id = serviceIdCounter;
      title;
      description;
      category;
      price;
      providerId = caller;
      available = true;
    };
    services := Array.append(services, [newService]);

    // Update user's servicesOffered
    users := Array.map<User>(users, func(u) {
      if (u.id == caller) {
        { u with servicesOffered = Array.append(u.servicesOffered, [newService.id]) }
      } else {
        u
      }
    });

    serviceIdCounter += 1;
    return newService.id;
  };

  // ---------- Request Functions ----------

  public func requestService(serviceId: Nat, message: Text): async Nat {
    let caller = Principal.fromActor(this);

    // Find service
    let serviceOpt = Array.find<Service>(services, func(s) { s.id == serviceId });

    switch (serviceOpt) {
      case (?service) {
        let newRequest: ServiceRequest = {
          id = requestIdCounter;
          serviceId;
          seekerId = caller;
          providerId = service.providerId;
          message;
          status = #Pending;
        };
        requests := Array.append(requests, [newRequest]);

        // Update user's servicesRequested
        users := Array.map<User>(users, func(u) {
          if (u.id == caller) {
            { u with servicesRequested = Array.append(u.servicesRequested, [newRequest.id]) }
          } else {
            u
          }
        });

        requestIdCounter += 1;
        return newRequest.id;
      };
      case null {
        return 999_999; // indicate invalid service
      };
    };
  };

  // ---------- Optional: Debug/Read Functions ----------

  public query func getAllServices(): async [Service] {
    services
  };

  public query func getMyServices(): async [Service] {
    let caller = Principal.fromActor(this);
    Array.filter<Service>(services, func(s) { s.providerId == caller })
  };

  public query func getMyRequests(): async [ServiceRequest] {
    let caller = Principal.fromActor(this);
    Array.filter<ServiceRequest>(requests, func(r) { r.seekerId == caller })
  };

};
