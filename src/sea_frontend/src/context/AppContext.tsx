import React, {
  createContext,
  useContext,
  useEffect,
  useState,
  FC,
} from "react";
import {
  AuthClient,
  AuthClientCreateOptions,
  AuthClientLoginOptions,
} from "@dfinity/auth-client";
import { Actor, ActorSubclass, HttpAgent, Identity } from "@dfinity/agent";
import { Principal } from "@dfinity/principal";
import { canisterId as iiCanId } from "../../../declarations/internet_identity";
import { canisterId, idlFactory } from "../../../declarations/sea_backend";
import type {
  _SERVICE,
  User as BackendUser,
  UserRole as BackendUserRole,
  ServiceRequest as BackendServiceRequest,
  RequestStatus,
} from "../../../declarations/sea_backend/sea_backend.did";

function stringToUserRole(role: string): BackendUserRole {
  switch (role) {
    case "Provider":
      return { Provider: null };
    case "Seeker":
      return { Seeker: null };
    case "Both":
      return { Both: null };
    default:
      throw new Error("Invalid role string");
  }
}

function userRoleToString(role: BackendUserRole): string {
  if ("Provider" in role) return "Provider";
  if ("Seeker" in role) return "Seeker";
  if ("Both" in role) return "Both";
  return "Unknown";
}

function requestStatusToString(status: RequestStatus): string {
  if ("Pending" in status) return "Pending";
  if ("Accepted" in status) return "Accepted";
  if ("Rejected" in status) return "Rejected";
  if ("Completed" in status) return "Completed";
  return "Unknown";
}


type User = BackendUser;
type ServiceRequest = BackendServiceRequest;
type UserRole = BackendUserRole;

interface ContextType {
  isAuthenticated: boolean | null;
  backendActor: ActorSubclass<_SERVICE> | null;
  identity: Identity | null;
  login: () => void;
  logout: () => void;

  registerUser: (user: User) => Promise<void>;
  getUser: (email: string) => Promise<User | null>;
  addService: (
    title: string,
    description: string,
    category: string,
    price: number
  ) => Promise<bigint | null>;
  requestService: (serviceId: bigint, message: string) => Promise<bigint | null>;
  getAllServices: () => Promise<Service[]>;
  getMyServices: () => Promise<Service[]>;
  getMyRequests: () => Promise<ServiceRequest[]>;
}

interface Service {
  id: bigint;
  title: string;
  description: string;
  category: string;
  price: number;
  providerId: Principal;
  available: boolean;
}

const initialContext: ContextType = {
  identity: null,
  backendActor: null,
  isAuthenticated: false,
  login: () => {},
  logout: () => {},
  registerUser: async () => {},
  getUser: async () => null,
  addService: async () => null,
  requestService: async () => null,
  getAllServices: async () => [],
  getMyServices: async () => [],
  getMyRequests: async () => [],
};

const AuthContext = createContext<ContextType>(initialContext);

const network = import.meta.env.VITE_DFX_NETWORK || "local";
const localhost = "http://localhost:4943";
const host = "https://icp0.io";

interface DefaultOptions {
  createOptions: AuthClientCreateOptions;
  loginOptions: AuthClientLoginOptions;
}

const defaultOptions: DefaultOptions = {
  createOptions: {
    idleOptions: {
      disableIdle: true,
    },
  },
  loginOptions: {
    identityProvider:
      network === "ic"
        ? "https://identity.ic0.app/#authorize"
        : `http://${iiCanId}.localhost:4943`,
  },
};

export const useAuthClient = (options = defaultOptions): ContextType => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);
  const [authClient, setAuthClient] = useState<AuthClient | null>(null);
  const [backendActor, setBackendActor] = useState<ActorSubclass<_SERVICE> | null>(null);
  const [identity, setIdentity] = useState<Identity | null>(null);

  useEffect(() => {
    AuthClient.create(options.createOptions).then(async (client) => {
      updateClient(client);
    });
  }, [options.createOptions]);

  const login = () => {
    authClient?.login({
      ...options.loginOptions,
      onSuccess: () => {
        updateClient(authClient);
      },
    });
  };

  async function updateClient(client: AuthClient) {
    const isAuthenticated = await client.isAuthenticated();
    setIsAuthenticated(isAuthenticated);
    setAuthClient(client);

    const _identity = client.getIdentity();
    setIdentity(_identity);

    const agent = new HttpAgent({
      host: network === "local" ? localhost : host,
      identity: _identity,
    });

    if (network === "local") {
      agent.fetchRootKey();
    }

    const _backendActor: ActorSubclass<_SERVICE> = Actor.createActor(idlFactory, {
      agent,
      canisterId: canisterId,
    });
    setBackendActor(_backendActor);
  }

  async function logout() {
    await authClient?.logout();
    if (authClient) {
      await updateClient(authClient);
    }
  }

  async function registerUser(user: User) {
    if (!backendActor) return;
    await backendActor.registerUser(user);
  }

  async function getUser(email: string): Promise<User | null> {
    if (!backendActor) return null;
    const result = await backendActor.getUser(email);
    if ("ok" in result) return result.ok;
    return null;
  }

  async function addService(
    title: string,
    description: string,
    category: string,
    price: number
  ): Promise<bigint | null> {
    if (!backendActor) return null;
    return await backendActor.addService(title, description, category, price);
  }

  async function requestService(
    serviceId: bigint,
    message: string
  ): Promise<bigint | null> {
    if (!backendActor) return null;
    return await backendActor.requestService(serviceId, message);
  }

  async function getAllServices(): Promise<Service[]> {
    if (!backendActor) return [];
    return await backendActor.getAllServices();
  }

  async function getMyServices(): Promise<Service[]> {
    if (!backendActor) return [];
    return await backendActor.getMyServices();
  }

  async function getMyRequests(): Promise<ServiceRequest[]> {
    if (!backendActor) return [];
    return await backendActor.getMyRequests();
  }

  return {
    isAuthenticated,
    backendActor,
    identity,
    login,
    logout,
    registerUser,
    getUser,
    addService,
    requestService,
    getAllServices,
    getMyServices,
    getMyRequests,
  };
};

interface LayoutProps {
  children: React.ReactNode;
}

export const AuthProvider: FC<LayoutProps> = ({ children }) => {
  const auth = useAuthClient();
  return <AuthContext.Provider value={auth}>{children}</AuthContext.Provider>;
};

export const useAuth = () => useContext(AuthContext);
