

export default function MessageInput() {
    return (
        <Input
                            
                            onKeyPress={(event) => {

                                if (event.key === 'Enter' && event.target.value.length > 0) {
                                    event.preventDefault();
                                    handleNewMessage(mensagem)
                                }

                            }}

                            onChange={
                                handleChange
                            }
                            placeholder="Insira sua mensagem aqui..."
                            type={'textarea'}
                            width={'100%'}
                            border={'0'}
                            resize={'none'}
                            borderRadius={'5px'}
                            padding={'6px 8px'}
                            backgroundColor={appConfig.theme.colors.neutrals[800]}
                            mr={'12px'}
                            textColor={appConfig.theme.colors.neutrals[200]}
                        />
    );
}