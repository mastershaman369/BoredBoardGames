// Example community posts data
export interface CommunityPost {
  id: string;
  user: { id: string; name: string };
  title: string;
  content: string;
  createdAt: string;
}

export const exampleCommunityPosts: CommunityPost[] = [
  {
    id: "1",
    user: { id: "u1", name: "Alice" },
    title: "Monopoly Strategies",
    content: "Share your best strategies for winning Monopoly. Do you focus on railroads or properties?",
    createdAt: "2025-04-18 10:00 AM"
  },
  {
    id: "2",
    user: { id: "u2", name: "Bob" },
    title: "Catan House Rules",
    content: "What house rules do you use to make Catan more fun? I always give 1 extra brick at start.",
    createdAt: "2025-04-18 11:30 AM"
  },
  {
    id: "3",
    user: { id: "u3", name: "Carol" },
    title: "Family Game Night Ideas",
    content: "Looking for suggestions on easy-to-learn board games for families with kids aged 6-10.",
    createdAt: "2025-04-18 02:15 PM"
  }
];
