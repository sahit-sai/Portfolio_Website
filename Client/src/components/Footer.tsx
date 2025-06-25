
export const Footer = () => {
  return (
    <footer className="bg-card border-t">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="text-center">
          <div className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-4">
            Krishna Chavan
          </div>
          <p className="text-muted-foreground mb-4">
            Professional Freelancer & Full Stack Web Developer
          </p>
          <p className="text-sm text-muted-foreground">
            © {new Date().getFullYear()} Krishna Chavan. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};
