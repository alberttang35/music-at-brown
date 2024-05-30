import { User } from "../../types/types";

interface UserCalendarProps {
  currentUser: User;
}

export default function UserCalendar({ currentUser }: UserCalendarProps) {
  // look at currentUser.targetEvents when populating their calendar
  return <></>;
}
