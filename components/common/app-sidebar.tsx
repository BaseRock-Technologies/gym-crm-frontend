"use client";
import React from "react";
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
import { useRouter, usePathname } from "next/navigation";
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
  const { loading, user, setLoading } = useAuth();
  const router = useRouter();
  const pathname = usePathname();
  const [billingOpen, setBillingOpen] = React.useState(false);
  // Open Billing dropdown if any billing subitem is active
  React.useEffect(() => {
    const billingItem = items.find(i => i.title === "Billing");
    if (billingItem && Array.isArray(billingItem.subMenu) && billingItem.subMenu.some(subItem => subItem.url === pathname)) {
      setBillingOpen(true);
    }
  }, [pathname]);
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
            <SidebarMenuButton size="lg" asChild isActive={false}>
              <a href="/dashboard">
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
              </a>
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
                  // Only Billing tab is active if open, others are not
                  const isBillingActive = billingOpen || item.subMenu.some(subItem => subItem.url === pathname);
                  return (
                    <Collapsible className="group/collapsible" key={item.title} open={billingOpen} onOpenChange={setBillingOpen}>
                      <SidebarMenuItem>
                        <CollapsibleTrigger asChild>
                          <SidebarMenuButton isActive={isBillingActive}>
                            <item.icon className="text-primary" />
                            <span>{item.title}</span>
                            <ChevronDown className="ml-auto mr-2 transition-transform group-data-[state=open]/collapsible:rotate-180 text-primary" />
                          </SidebarMenuButton>
                        </CollapsibleTrigger>
                        <CollapsibleContent>
                          <SidebarMenuSub>
                            {item.subMenu.map((subItem, idx) => (
                              <SidebarMenuSubItem key={subItem.title}>
                                <a
                                  href={subItem.url || "#"}
                                  style={{
                                    ...(subItem.title === "Personal Training Bill"
                                      ? {
                                          whiteSpace: 'normal',
                                          wordBreak: 'break-word',
                                          display: 'block',
                                          marginTop: idx === 1 ? '8px' : undefined,
                                          marginBottom: '4px',
                                        }
                                      : { whiteSpace: 'nowrap' }),
                                    background: subItem.url === pathname ? '#e0fcff' : undefined,
                                    borderRadius: subItem.url === pathname ? '8px' : undefined,
                                    padding: subItem.url === pathname ? '8px 12px' : undefined,
                                    width: subItem.url === pathname ? '100%' : undefined,
                                  }}
                                >
                                  {subItem.title === "Personal Training Bill"
                                    ? (<><span>Personal Training</span><br /><span>Bill</span></>)
                                    : subItem.title}
                                </a>
                              </SidebarMenuSubItem>
                            ))}
                          </SidebarMenuSub>
                        </CollapsibleContent>
                      </SidebarMenuItem>
                    </Collapsible>
                  );
                } else {
                  // Only one tab active at a time: if Billing is open, others are not active
                  const isActive = item.url === pathname && !billingOpen;
                  return (
                    <SidebarMenuItem key={item.title}>
                      <SidebarMenuButton asChild isActive={isActive}>
                        <a href={item.url}>
                          <item.icon className="text-primary" />
                          <span>{item.title}</span>
                        </a>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  );
                }
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
