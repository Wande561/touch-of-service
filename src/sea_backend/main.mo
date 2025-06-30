import Nat "mo:base/Nat";
import Array "mo:base/Array";
import Principal "mo:base/Principal";
import TrieMap "mo:base/TrieMap";
import Text "mo:base/Text";
import Iter "mo:base/Iter";
import Result "mo:base/Result";
import Hash "mo:base/Hash";
//import msg "mo:base/ExperimentalInternetComputer";


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
    address: Text;
    // idNumber: ?Text
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

  // ---------- User Functions ----------

  var users = TrieMap.TrieMap<Text, User>(Text.equal, Text.hash);
  stable var usersEntries: [(Text, User)] = [];

  var services = TrieMap.TrieMap<Nat, Service>(Nat.equal, Hash.hash);
  stable var servicesEntries: [(Nat, Service)] = [];
  stable var serviceIdCounter: Nat = 0;

  
  system func preupgrade() {
    usersEntries := Iter.toArray(users.entries());
    servicesEntries := Iter.toArray(services.entries());
  };

  system func postupgrade() {
    users := TrieMap.fromEntries(usersEntries.vals(), Text.equal, Text.hash);
    services := TrieMap.fromEntries(servicesEntries.vals(), Nat.equal, Hash.hash);
  };

  public shared func registerUser(args : User) : async () {
    users.put(args.email, args);
  };

  public shared query func getUser(email : Text) : async Result.Result<User, Text> {
    switch (users.get(email)) {
      case (null) {
        return #err("User not found");
      };
      case (?user) {
        return #ok(user);
      };
    };
  };

  public shared func updateUser(args : User) : async () {
    users.put(args.email, args);
  };

  public shared func deleteUser(email : Text) : async () {
    users.delete(email);
  };

  public shared query func getAllUsers() : async [User] {
    Iter.toArray(users.vals());
  };

  public shared query func getUserAccessLevel(email : Text) : async Result.Result<Text, Text> {
    switch (users.get(email)) {
      case (null) {
        return #err("User not found");
      };
      case (?user) {
        switch (user.role) {
          case (#Provider) {
            return #ok("You are an Provider");
          };
          case (#Seeker) {
            return #ok("You are just a Seeker");
          };
          case (#Both) {
            return #ok("You are a Both");
          };
        };
      };
    };
  };

  // ---------- Service Functions ----------

  public shared(msg) func addService(
     title: Text,
     description: Text,
     category: Text,
     price: Float
  ) : async Nat {
     let newService: Service = {
       id = serviceIdCounter;
       title = title;
       description = description;
       category = category;
       price = price;
       providerId = msg.caller;
       available = true;
     };

     let callerText = Principal.toText(msg.caller);
     services.put(serviceIdCounter, newService);
     switch (users.get(callerText)) { 
       case (?user) {
        let updatedUser = {
          user with servicesOffered = Array.append(user.servicesOffered, [newService.id])
        };
        users.put(callerText, updatedUser);
       };
       case null {};
      };

     serviceIdCounter += 1;
     return newService.id;
  };




  // ---------- Request Functions ----------

  var requests = TrieMap.TrieMap<Nat, ServiceRequest>(Nat.equal, Hash.hash);
  stable var requestsEntries: [(Nat, ServiceRequest)] = [];
  stable var requestIdCounter: Nat = 0;


  public shared(msg) func requestService(serviceId: Nat, message: Text): async Nat {
    let caller = msg.caller;
    let serviceOpt = services.get(serviceId);

    switch (serviceOpt) {
      case (?service) {
        let newRequest: ServiceRequest = {
          id = requestIdCounter;
          serviceId = serviceId;
          seekerId = caller;
          providerId = service.providerId;
          message = message;
          status = #Pending;
        };
        requests.put(requestIdCounter, newRequest);
        requestIdCounter += 1;
        return newRequest.id;
      };
      case null {
        return 999_999; 
      };
    };
  };

  // ---------- Optional: Debug/Read Functions ----------

  public query func getAllServices(): async [Service] {
    Iter.toArray(services.vals())
  };

  public shared query(msg) func getMyServices(): async [Service] {
    let caller = msg.caller;
    Iter.toArray(
        Iter.filter<Service>(services.vals(), func(s) { s.providerId == caller })
    )
  };
  
  public shared query(msg) func getMyRequests(): async [ServiceRequest] {
    let caller = msg.caller;
    Iter.toArray(
        Iter.filter<ServiceRequest>(requests.vals(), func(r) { r.seekerId == caller })
    )
  };

};
