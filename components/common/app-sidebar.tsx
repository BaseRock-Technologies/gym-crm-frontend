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
