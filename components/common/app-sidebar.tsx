"use client";
import {
  Book,
  ChevronDown,
  CircleArrowOutUpRight,
  CircleHelp,
  Dumbbell,
  LayoutDashboard,
  Library,
  MessageCircle,
  ReceiptText,
  User2,
  UsersRound,
} from "lucide-react";

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubItem,
} from "@/components/ui/sidebar";
import {
  CollapsibleTrigger,
  Collapsible,
  CollapsibleContent,
} from "../ui/collapsible";
import { useAuth } from "@/lib/context/authContext";

// Menu items.
const items = [
  {
    title: "Dashboard",
    url: "/dashboard",
    icon: LayoutDashboard,
  },
  {
    title: "Inquiry",
    url: "/manage-query",
    icon: CircleHelp,
  },
  {
    title: "Clients",
    url: "/manage-customers",
    icon: UsersRound,
  },
  {
    title: "Billing",
    url: "#",
    icon: ReceiptText,
    subMenu: [
      {
        title: "Gym Membership Bill",
        url: "/gym-bill",
      },
      {
        title: "Personal Training Bill",
        url: "/personal-training-bill",
      },
      {
        title: "Group Class Bill",
        url: "/group-class-bill",
      },
      {
        title: "POS",
        url: "/pos",
      },
    ],
  },
  {
    title: "Attendance",
    url: "/customer-attendance",
    icon: Book,
  },
  {
    title: "Forms",
    url: "/client-forms",
    icon: Library,
  },
  {
    title: "Feedback",
    url: "/feedback",
    icon: MessageCircle,
  },
];

export function AppSidebar() {
  const { loading, user } = useAuth();
  return (
    <Sidebar collapsible="icon">
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton size="lg" asChild>
              <a href="/dashboard">
                <div className="flex aspect-square size-8 p-2 items-center justify-center rounded-lg bg-primary">
                  <Dumbbell className="text-white" />
                </div>
                <span>Fitpass</span>
              </a>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) =>
                item.subMenu ? (
                  <Collapsible className="group/collapsible" key={item.title}>
                    <SidebarMenuItem>
                      <CollapsibleTrigger asChild>
                        <SidebarMenuButton>
                          <item.icon className="text-primary" />
                          <span>{item.title}</span>
                          <ChevronDown className="ml-auto mr-2 transition-transform group-data-[state=open]/collapsible:rotate-180 text-primary" />
                        </SidebarMenuButton>
                      </CollapsibleTrigger>
                      <CollapsibleContent>
                        <SidebarMenuSub>
                          {item.subMenu.map((subItem) => (
                            <SidebarMenuSubItem key={subItem.title}>
                              <a href={subItem.url || "#"}>{subItem.title}</a>
                            </SidebarMenuSubItem>
                          ))}
                        </SidebarMenuSub>
                      </CollapsibleContent>
                    </SidebarMenuItem>
                  </Collapsible>
                ) : (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton asChild>
                      <a href={item.url}>
                        <item.icon className="text-primary" />
                        <span>{item.title}</span>
                      </a>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                )
              )}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton>
              <User2 /> {!loading && user && user.userName}
              <CircleArrowOutUpRight className="relative flex justify-center items-center w-6 h-6 ml-auto text-primary" />
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  );
}
