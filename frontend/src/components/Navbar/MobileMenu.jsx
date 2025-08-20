import NavLinks from "./NavLinks";

export default function MobileMenu() {
  return (
    <div className="md:hidden bg-white px-6 pt-4 pb-6 text-sm font-semibold tracking-wider">
      <NavLinks className="flex flex-col space-y-4" />
    </div>
  );
}
