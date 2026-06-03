import UserService from "@repo/services/user";
import VisitorService from "@repo/services/visitor";
import GuestbookService from "@repo/services/guestbook";
import ReactionService from "@repo/services/reaction";

export const userService = new UserService();
export const visitorService = new VisitorService();
export const guestbookService = new GuestbookService();
export const reactionService = new ReactionService();
