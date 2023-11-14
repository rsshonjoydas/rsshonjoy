export const SiteFooter = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className='items-center justify-center space-y-2 border-t py-10 text-center text-xs sm:flex'>
      <p className='mt-1.5 pr-2'>
        Built & Designed by <span className='text-primary'>@rsshonjoydas</span>
      </p>
      <p>&copy; {currentYear} Store, Inc. All rights reserved.</p>
    </footer>
  );
};
