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
import { useEffect, useState } from "react";

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
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@radix-ui/react-dropdown-menu";
import Cookies from "js-cookie";
import { useRouter, usePathname } from "next/navigation";

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
  const { loading, user, setLoading } = useAuth();
  const router = useRouter();
  const pathname = usePathname();
  const [mounted, setMounted] = useState(false);
  const [isBillingOpen, setIsBillingOpen] = useState(false);
  
  useEffect(() => {
    setMounted(true);
  }, []);

  // Check if current page is a billing submenu item and keep billing dropdown open
  useEffect(() => {
    if (mounted) {
      const billingUrls = ["/gym-bill", "/personal-training-bill", "/group-class-bill", "/pos"];
      const isOnBillingPage = billingUrls.includes(pathname);
      
      if (isOnBillingPage) {
        setIsBillingOpen(true);
      }
      // Don't close the dropdown when navigating between billing pages
      // Only close when explicitly navigating away from all billing pages
    }
  }, [mounted, pathname]);

  // Helper function to check if any submenu item is active
  const isSubmenuActive = (subMenu: any[]) => {
    if (!mounted || !subMenu) return false;
    return subMenu.some((subItem: any) => pathname === subItem.url);
  };
  
  function logoutUser() {
    setLoading(true);
    Cookies.remove("user");
    router.push("/signin");
  }

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
                  <Collapsible 
                    className="group/collapsible" 
                    key={item.title}
                    open={item.title === "Billing" ? isBillingOpen : undefined}
                    onOpenChange={item.title === "Billing" ? setIsBillingOpen : undefined}
                  >
                    <SidebarMenuItem>
                      <CollapsibleTrigger asChild>
                        <SidebarMenuButton 
                          className={
                            isSubmenuActive(item.subMenu) || (item.title === "Billing" && isBillingOpen)
                              ? "bg-sidebar-accent text-sidebar-accent-foreground" 
                              : ""
                          }
                        >
                          <item.icon className="text-primary" />
                          <span>{item.title}</span>
                          <ChevronDown className="ml-auto mr-2 transition-transform group-data-[state=open]/collapsible:rotate-180 text-primary" />
                        </SidebarMenuButton>
                      </CollapsibleTrigger>
                      <CollapsibleContent>
                        <SidebarMenuSub>
                          {item.subMenu.map((subItem) => (
                            <SidebarMenuSubItem key={subItem.title}>
                              <a 
                                href={subItem.url || "#"}
                                className={`block w-full px-3 rounded-md transition-colors ${
                                  mounted && pathname === subItem.url 
                                    ? "bg-sidebar-accent text-sidebar-accent-foreground" 
                                    : "hover:bg-sidebar-accent/50"
                                }`}
                              >
                                {subItem.title}
                              </a>
                            </SidebarMenuSubItem>
                          ))}
                        </SidebarMenuSub>
                      </CollapsibleContent>
                    </SidebarMenuItem>
                  </Collapsible>
                ) : (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton asChild>
                      <a 
                        href={item.url}
                        className={mounted && pathname === item.url && !isBillingOpen ? "bg-sidebar-accent text-sidebar-accent-foreground" : ""}
                      >
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
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <SidebarMenuButton>
                  <User2 /> {!loading && user && user.userName}
                  <CircleArrowOutUpRight className="relative flex justify-center items-center w-6 h-6 ml-auto text-primary" />
                </SidebarMenuButton>
              </DropdownMenuTrigger>
              <DropdownMenuContent
                side="top"
                align="center"
                className="w-[--radix-popper-anchor-width] bg-white border-2 border-backgroundSupport rounded-md shadow-md mb-4 p-2"
              >
                <DropdownMenuItem
                  onClick={logoutUser}
                  className="outline-none border-none text-primary transition cursor-pointer"
                >
                  <span>Log out</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  );
}
