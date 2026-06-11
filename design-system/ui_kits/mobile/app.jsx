/* global React, ReactDOM, PhoneFrame, AuthScreen, VerificationScreen, WelcomeScreen, ListScreen, DetailsScreen, ReportScreen, ChatScreen, InboxScreen, ConfirmationScreen, CF_ITEMS */
// CampusFinder UI kit — navigation shell.

function CampusFinderApp({ start = 'list' }) {
  const [screen, setScreen] = React.useState(start);
  const [mode, setMode] = React.useState('signup');
  const [item, setItem] = React.useState(CF_ITEMS[1]);
  const [confirm, setConfirm] = React.useState({ title: 'Report Submitted!', message: "Your item is now live. We'll notify you when someone reaches out." });

  const chats = [
    { ...CF_ITEMS[1], reporterName: 'Kwame Mensah', last: '10:32 AM', preview: "Yes! Can you describe a detail?" },
    { ...CF_ITEMS[0], reporterName: 'Sarah Johnson', last: 'Yesterday', preview: 'Great, see you at the library!' },
  ];

  const go = setScreen;
  const statusDark = screen === 'auth' || screen === 'welcome';
  const statusBg = (screen === 'auth' || screen === 'welcome') ? 'transparent' : 'var(--surface-card)';

  let view;
  switch (screen) {
    case 'auth': view = <AuthScreen mode={mode} setMode={setMode} onAuthed={() => go('verify')} />; break;
    case 'verify': view = <VerificationScreen onVerified={() => go('welcome')} onBack={() => go('auth')} />; break;
    case 'welcome': view = <WelcomeScreen onStart={() => go('list')} />; break;
    case 'list': view = <ListScreen onOpenItem={(it) => { setItem(it); go('details'); }} onReport={() => go('report')} onInbox={() => go('inbox')} chatCount={chats.length} />; break;
    case 'details': view = <DetailsScreen item={item} onBack={() => go('list')} onChat={() => go('chat')} />; break;
    case 'report': view = <ReportScreen onBack={() => go('list')} onSubmit={() => { setConfirm({ title: 'Report Submitted!', message: "Your item is now live. We'll notify you when someone reaches out." }); go('confirmation'); }} />; break;
    case 'chat': view = <ChatScreen item={item} onBack={() => go('details')} onEnd={() => { setConfirm({ title: 'Chat Closed', message: 'Thanks for keeping campus connected. We hope the item finds its owner!' }); go('confirmation'); }} />; break;
    case 'inbox': view = <InboxScreen chats={chats} onBack={() => go('list')} onOpen={(c) => { setItem(c); go('chat'); }} />; break;
    case 'confirmation': view = <ConfirmationScreen title={confirm.title} message={confirm.message} onDone={() => go('list')} />; break;
    default: view = null;
  }

  return (
    <PhoneFrame statusDark={statusDark} statusBg={statusBg}>
      {view}
    </PhoneFrame>
  );
}

// index.html owns mounting (so the jump control can re-render at any screen).
window.CampusFinderApp = CampusFinderApp;
