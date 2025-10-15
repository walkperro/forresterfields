export type PlannerRequest = {
  id: string;
  created_at: string;
  planner_name: string | null;
  email: string | null;
  phone: string | null;
  event_date: string | null;
  city_venue: string | null;
  roles_needed: string | null;
  status: "new" | "contacted" | "booked" | "archived" | null;
};
