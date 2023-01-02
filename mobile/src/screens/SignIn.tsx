import { Text, Center, Icon } from 'native-base';
import { Fontisto } from '@expo/vector-icons'

import Logo from '../assets/logo.svg'
import { Button } from '../components/Button';

import { useAuth } from '../hooks/useAuth';

export function SignIn() {

    const {signIn, isUserLoading } = useAuth()

    return (
        <Center flex={1} bg="gray.700" p={7}>
            <Logo width={212} height={40} />
            <Button  
            title='Entrar com o google'
            type='SECONDARY'
            leftIcon={<Icon as={Fontisto} name='google' color="white" size="sm" />}
            mt={12}
            onPress={signIn}
            isLoading={isUserLoading}
            _loading={{ _spinner: {color: 'white'} }}
            />
            <Text color="white" textAlign="center" mt={4}>
                Não utilizamos nenhuma informação além {'\n'} do seu e-mail para criação de sua conta.
            </Text>
        </Center>
    )
}