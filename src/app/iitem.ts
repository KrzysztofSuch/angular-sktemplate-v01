import { Iitems, Iitems2, Iitems3, Iitems4 } from "./iitems";

export interface Iitem {
  ID: string;
  Name: string;
  Items2: Iitems2;
}

export interface Iitem2 {
  ID: string;
  Name: string;
  Items3: Iitems3;
}

export interface Iitem3 {
  ID: string;
  Name: string;
  // Level: number;
  Items4: Iitems4;
}

export interface Iitem4 {
  ID: string;
  Name: string;
}
