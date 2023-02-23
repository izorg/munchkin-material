const hideWindowsBackButton = (): void => {
  const currentView =
    window.Windows.UI.Core.SystemNavigationManager.getForCurrentView();

  currentView.appViewBackButtonVisibility =
    window.Windows.UI.Core.AppViewBackButtonVisibility.collapsed;
};

export default hideWindowsBackButton;
