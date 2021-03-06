import React, {useState, useEffect} from 'react'
import {
    VStack,
    FormControl,
    FormLabel,
    FormErrorMessage,
    Input,
    Button,
    Image,
    Radio, 
    RadioGroup,
    Stack,
    HStack,
    Text
  } from '@chakra-ui/react';

import {Formik, Field, Form} from 'formik'
import { Link, useNavigate } from "react-router-dom";
import logo from './images/logo.png'
import { setSessionCookie, getSessionCookie } from './contexts/useSession';

export default function SignIn() {

  const [value, setValue] = useState('Paciente')
  const [session, setSession] = useState(getSessionCookie())
  const navigate = useNavigate()

    useEffect(() => {
      if(session){
        if(session === 'Gestao') return navigate('/gestao')
        if(session === 'Paciente') return navigate('/recompensas')
      }
    },[session])
   
    
    function validate(value) {
        let error
        if (!value) {
          error = 'This field is required'
        } 
        return error
      }
      

  return (

      <VStack width="100%" height="100vh" alignItems="center" justifyContent="center" spacing={12}>

        <Image src={logo} width="250px"/>
      
          
        <VStack spacing={10}>
        <Formik
      initialValues={{ cpf: '', password: '', tipo: '' }}
      onSubmit={(values, actions) => {
        
        const {cpf, password, tipo} = values
        

        if(cpf && password){
          if(tipo === 'Paciente'){
            setSessionCookie(tipo)
            return setTimeout(() => {
              
              window.location.reload()
              navigate('/recompensas')
              
            } , 1000)
          }

          if(tipo === 'Gestao'){
            setSessionCookie(tipo)
            return setTimeout(() => {
             
              window.location.reload()
              navigate('/gestao')
              
            }, 1000)
          }
        }
        
      }}

    >
      {(props) => (
        <Form>
          <Field name='cpf' validate={validate}>
            {({ field, form }) => (
              <FormControl isInvalid={form.errors.cpf && form.touched.cpf}>
                <FormLabel htmlFor='cpf' textAlign="center" fontWeight="bold" color="blue.700">CPF</FormLabel>
                <Input {...field} id='cpf' backgroundColor="gray.300" placeholder='Digite seu cpf' />
                <FormErrorMessage>{form.errors.cpf}</FormErrorMessage>
              </FormControl>
            )}
          </Field>

            
          <Field name='password' validate={validate}>
            {({ field, form }) => (
              <FormControl isInvalid={form.errors.password && form.touched.password}>
                <FormLabel marginTop="12px" htmlFor='password' textAlign="center" fontWeight="bold"  color="blue.700">Senha</FormLabel>
                <Input {...field} id='password' type="password" backgroundColor="gray.300" placeholder='Digite sua senha' />
                <FormErrorMessage>{form.errors.password}</FormErrorMessage>
              </FormControl>
            )}
          </Field>

          <Field name='tipo' validate={validate}>
            {({ field, form }) => (
              <FormControl isInvalid={form.errors.tipo && form.touched.tipo}>
                
                <RadioGroup id="tipo" name="tipo">
                  <Stack marginTop="20px" direction='row'>
                    <Radio {...field} value='Paciente'  name="tipo" >Paciente</Radio>
                    <Radio  {...field} value='Gestao' name="tipo">Gest??o</Radio>
                  </Stack>
                </RadioGroup>
                <FormErrorMessage>{form.errors.tipo}</FormErrorMessage>
              </FormControl>
            )}
          </Field>


          <Button
            mt={4}
            colorScheme="blue"
            isLoading={props.isSubmitting}
          
            type='submit'
            width="100%"
          >
            Entrar
          </Button>
        </Form>
      )}
      </Formik>


      <VStack alignSelf="flex-start" alignItems="flex-start" justifyContent="flex-start">
        <Link to="/register">
          <Text color="blue.500">+ Criar conta</Text> 
        </Link>

        <Link to="/forgot">
          <Text color="blue.500">Esqueci a senha</Text> 
        </Link>
      </VStack>
        </VStack>
      
     
      </VStack>

  )
}
