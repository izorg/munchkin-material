const hideWindowsBackButton = () => {
  const { Windows } = window;

  const currentView =
    Windows.UI.Core.SystemNavigationManager.getForCurrentView();

  currentView.appViewBackButtonVisibility =
    Windows.UI.Core.AppViewBackButtonVisibility.collapsed;
};

export default hideWindowsBackButton;
