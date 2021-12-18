export default function SiteLauout({
  children,
  menu = c => null
}) {
  return (
    <div className="site-container">
      <div className="menu">{menu}</div>
      <div className="content">{children}</div>
    </div>
  );
}
