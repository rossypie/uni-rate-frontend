import { Menu, Button, Text } from '@mantine/core';
import { IconSettings, IconSearch, IconPhoto, IconMessageCircle, IconLogout, IconArrowsLeftRight } from '@tabler/icons';

interface AccountButtonProps{
  text: String,
  setLogged: React.Dispatch<React.SetStateAction<boolean>>
}

const AccountButton = (props:AccountButtonProps) => {

  const Logout = () => {
    localStorage.removeItem('auth_token');
    props.setLogged(false)
  }

  return (
    <Menu shadow="md" width={200}>
      <Menu.Target>
        <Button>{props.text}</Button>
      </Menu.Target>

      <Menu.Dropdown>
        <Menu.Label>Account</Menu.Label>
        <Menu.Item icon={<IconSettings size={14} />}>Settings</Menu.Item>
        <Menu.Divider />
        <Menu.Item color="red" onClick={()=>Logout()} icon={<IconLogout size={14} />}>Logout</Menu.Item>
      </Menu.Dropdown>
    </Menu>
  );
}

export default AccountButton;
