import { UserProfile } from '@clerk/nextjs';

const SettingsPage = () => (
  <div className='my-6 w-[95%]'>
    <UserProfile
      appearance={{
        elements: {
          rootBox: {
            boxShadow: 'none',
            width: '100%',
          },
          card: {
            border: 'none',
            boxShadow: 'none',
            width: '100%',
          },
        },
      }}
    />
  </div>
);

export default SettingsPage;
