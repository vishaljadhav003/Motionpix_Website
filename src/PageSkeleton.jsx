// Generic full-page skeleton shown briefly while a route "loads".
// Same shape on every page since routes swap instantly (no real
// async fetch) — this just gives a premium loading feel instead
// of a blank flash.
const PageSkeleton = () => {
  return (
    <div className="page-skeleton" aria-hidden="true">
      <div className="page-skeleton__bar page-skeleton__title" />
      <div className="page-skeleton__bar page-skeleton__subtitle" />
      <div className="page-skeleton__bar page-skeleton__hero" />
      <div className="page-skeleton__row">
        <div className="page-skeleton__bar page-skeleton__card" />
        <div className="page-skeleton__bar page-skeleton__card" />
        <div className="page-skeleton__bar page-skeleton__card" />
      </div>
    </div>
  );
};

export default PageSkeleton;