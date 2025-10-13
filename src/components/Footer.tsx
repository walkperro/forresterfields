export default function Footer(){
  return (
    <footer className="mt-16 border-t">
      <div className="container py-10 text-sm text-gray-600">
        <div>© {new Date().getFullYear()} Forrester Fields • Loganville, GA</div>
        <div className="mt-2">Lakeside Weddings & Special Events</div>
      </div>
    </footer>
  );
}
