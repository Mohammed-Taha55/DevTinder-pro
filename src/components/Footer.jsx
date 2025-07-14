const Footer = () => {
  return (
    <footer className="footer bg-base-300 text-base-content p-6 mt-10 border-t border-base-200">
      <div className="w-full max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6 text-center md:text-left">
        <div>
          <h2 className="text-lg font-bold">DevTinder Pvt Ltd</h2>
          <p className="text-sm opacity-80">
            Connecting developers, one match at a time.
          </p>
        </div>

        <div>
          <h2 className="text-lg font-bold">Contact</h2>
          <p className="text-sm">
            📧 Email: <a className="link" href="mailto:support@devtinder.com">support@devtinder.com</a>
          </p>
          <p className="text-sm">
            📸 Instagram: <a className="link" href="https://instagram.com/devtinder" target="_blank" rel="noreferrer">@devtinder</a>
          </p>
        </div>

        <div className="text-sm text-center md:text-right flex items-center justify-center md:justify-end">
          <p className="w-full">
            © {new Date().getFullYear()} DevTinder Pvt Ltd. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;


