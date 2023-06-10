const hideWindowsBackButton = (): void => {
  const currentView =
    window.Windows.UI.Core.SystemNavigationManager.getForCurrentView();

  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  currentView.appViewBackButtonVisibility =
    // @ts-expect-error Windows issue
    window.Windows.UI.Core.AppViewBackButtonVisibility.collapsed;
};

export default hideWindowsBackButton;
