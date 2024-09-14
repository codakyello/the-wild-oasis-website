import SideNavigation from "../_components/SideNavigation";

export default function Layout({ children }) {
  return (
    <div className="grid grid-cols-[25.6rem_1fr] h-full gap-12">
      <SideNavigation />
      <div className="py-[4rem]">{children}</div>
    </div>
  );
}
