import SideNavigation from "../_components/SideNavigation";

export default function Layout({ children }) {
  return (
    <div className="grid grid-cols-[auto_1fr] md:grid-cols-[25.6rem_1fr] h-full">
      <SideNavigation />
      <div className="p-[4rem]">{children}</div>
    </div>
  );
}
