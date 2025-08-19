"use client";
import React from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";

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
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@radix-ui/react-dropdown-menu";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";
import Logo from "@/public/logo.svg";
import Image from "next/image";

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
  // Track which dropdown is open
  const [openDropdown, setOpenDropdown] = React.useState<string | null>(null);
  // Get current path and store in state to avoid hydration errors
  const pathname = usePathname();

  // Helper: is main item active (exact or starts with, ignore trailing slash)
  function isActive(url: string) {
    if (!url || url === "#") return false;
    const cleanPath = pathname.replace(/\/$/, "");
    const cleanUrl = url.replace(/\/$/, "");
    return cleanPath === cleanUrl || cleanPath.startsWith(cleanUrl + "/");
  }

  // Helper: is any submenu active
  function isSubMenuActive(subMenu: any[]) {
    return subMenu.some((sub) => isActive(sub.url));
  }

  // Helper: get class for active menu item
  function getMenuItemClass(active: boolean) {
    // Use the exact hover color from sidebar: bg-sidebar-accent text-sidebar-accent-foreground
    return active
      ? "bg-sidebar-accent text-sidebar-accent-foreground"
      : "";
  }

  // Helper: get class for active menu button
  function getMenuButtonClass(active: boolean) {
    return active ? "bg-primary/10" : "";
  }
  const { loading, user, setLoading } = useAuth();
  const router = useRouter();
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
              <Link href="/dashboard">
                <div className="flex aspect-square size-8 p-2 items-center justify-center rounded-lg bg-primary">
                  <Image
                    src={Logo}
                    alt="logo"
                    width={0}
                    height={0}
                    sizes="100vw"
                    className="w-full h-full text-white"
                  />
                </div>
                <span>Fitpass</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => {
                if (item.subMenu) {
                  const open = openDropdown === item.title;
                  return (
                    <Collapsible className="group/collapsible" key={item.title} open={open}>
                      <SidebarMenuItem>
                        <CollapsibleTrigger asChild>
                          <SidebarMenuButton onClick={() => setOpenDropdown(open ? null : item.title)}>
                            <item.icon className="text-primary" />
                            <span>{item.title}</span>
                            <ChevronDown className={`ml-auto mr-2 transition-transform group-data-[state=open]/collapsible:rotate-180 text-primary ${open ? "rotate-180" : ""}`} />
                          </SidebarMenuButton>
                        </CollapsibleTrigger>
                        <CollapsibleContent>
                          <SidebarMenuSub>
                            {item.subMenu.map((subItem) => {
                              const subActive = isActive(subItem.url);
                              return (
                                <SidebarMenuSubItem key={subItem.title} className={getMenuItemClass(subActive)}>
                                  <Link href={subItem.url || "#"}>{subItem.title}</Link>
                                </SidebarMenuSubItem>
                              );
                            })}
                          </SidebarMenuSub>
                        </CollapsibleContent>
                      </SidebarMenuItem>
                    </Collapsible>
                  );
                }
                const mainActive = isActive(item.url);
                return (
                  <SidebarMenuItem key={item.title} className={getMenuItemClass(mainActive)}>
                    <SidebarMenuButton asChild className={getMenuButtonClass(mainActive)}>
                      <Link href={item.url} onClick={() => setOpenDropdown(null)}>
                        <item.icon className="text-primary" />
                        <span>{item.title}</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                );
              })}
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
