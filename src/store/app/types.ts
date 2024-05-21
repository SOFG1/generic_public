import { IPdfReportData } from "../sentimentor";

export interface IAlert {
  text: string;
  isSuccess: boolean;
}

export interface INotification {
  id: number;
  created_at: string;
  files: { id: number; name: string; created_at: string }[];
  json: {
    [key: string]: any
  } | IPdfReportData
  text: string;
  them: string;
  viewed: boolean;
}


//Hints sequences:

// Digital post and settings facebook
//1. "digital-post1" - lights up digital post hint and arrow to menu-settings (Overview page)
//2. "digital-post2" - lights up general settings (Settings page)
//3. "digital-post3" - lights up add/edit facebook button settings (Settings page)

// Filters and fields
//1. "filters-hint1" - lights up gear-icon and arrow to menu-settings (Filters view)
//2. "filters-hint2" - lights up general settings  (Settings page)
//3. "filters-hint3" - lights up fields button in settings (Settings page)

//Status
//1. "status-chart1" - lights up gear-icon and arrow to menu-settings (StatusChartComponent)
//1. "status-chart2" - lights up general settings view (Settings page)
//2. "status-chart3" - lights up "edit-status" in settings (Settings page)

//Call Center
//1. "call-center1" - lights up gear-icon and arrow to menu-settigns (CallCenter page)
//2. "call-center2" - lights up 'edit questionnaires' button in settings (Settings page)


export type HintType =
//Digital post
  | "digital-post1"
  | "digital-post2"
  | "digital-post3"
  //Filters and fields
  | "filters-hint1"
  | "filters-hint2"
  | "filters-hint3"
  //Status
  | "status-chart1"
  | "status-chart2"
  | "status-chart3"
  //Call Center
  | "call-center1"
  | "call-center2"
  | null;





export interface IAppState {
  alert: IAlert | null;
  isModalOpened: boolean;
  notifications: INotification[];
  hint: HintType;
}
