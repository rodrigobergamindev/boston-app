import React, {useState, useEffect} from 'react'
import {
    Text,
    VStack,
    Grid,
    HStack,
    Heading,
    Button,
  } from '@chakra-ui/react';
import axios from 'axios'
import {useParams} from 'react-router-dom'

export default function MyJokes() {
    const [jokes, setJokes] = useState([])
    const [errorMessage, setErrorMessage] = useState(false)
    let {slug} = useParams()

    useEffect(() => {
        
        
            async function fetchData() {
                try {
              
                    const response = await axios.get(`https://jokerapi-usjt.herokuapp.com/user/${slug}/jokes`, {
                       withCredentials: true
                    })
    
                    setJokes(response.data)
                
            } catch (error) {
                 
                  if(error.response.status === 401){
                      setErrorMessage(true)
                  }
                
                
            }
            }

            fetchData()
        },[])

        
        async function handleDelete(joke){
          
            const response = await axios.delete(`https://jokerapi-usjt.herokuapp.com/${slug}/${joke.id}`, {
                withCredentials: true
            })

            if(response.status === 204){
                const newArray = jokes.filter(item => item.id !== joke.id)
                setJokes([...newArray])
            }
        }

  return (

      <>
      
      
           {!errorMessage ? (
                <VStack width="100%" height="100%" spacing={8}>
                <HStack 
                width="100%" 
                backgroundColor="blue.700"  
                alignItems="center" 
                justifyContent="center" 
                textAlign="center" 
                borderBottom="1px" 
                borderColor="gray.500"
                padding="10px"
                >
                    <Text fontSize="3xl" fontWeight="black" color="whiteAlpha.900">Joker API</Text>
                </HStack>
                <Heading>{`Jokes for ${slug}`}</Heading>
                  <Grid maxWidth="1200px" width="100%" templateColumns='repeat(4, 1fr)' justifyItems="center" gap={6}>
                        {
                            jokes.map(joke => (
                                <VStack key={joke.id} boxShadow="md" w="350px" h="250px" backgroundColor="gray.300" padding="10px">
                                    <HStack alignSelf="flex-start" justifyContent="space-between" borderBottom="2px" borderColor="whiteAlpha.900" width="100%" paddingBottom="2">
                                    <Text color="white" fontWeight="bold">{joke.category}</Text>
                                    <Text fontWeight="bold" color="white">{new Date(joke.createdAt).toLocaleDateString('pt-BR',{
                                        dateStyle: "short"
                                    })}</Text>
                                    <Button size="sm" colorScheme="red" onClick={() => handleDelete(joke)}> 
                                        X
                                    </Button>
                                    </HStack>
                                    <Text fontSize="md" fontWeight="bold">{joke.title}</Text>
                                    <Text textAlign="justify" maxW="100%" height="100%" overflowY="scroll" css={{
                                        '&::-webkit-scrollbar': {
                                            width: '4px',
                                          },
                                          '&::-webkit-scrollbar-track': {
                                            width: '6px',
                                          },
                                          '&::-webkit-scrollbar-thumb': {
                                            background: '#ecf0f1',
                                            borderRadius: '24px',
                                          },
                                    }} >{joke.description}</Text>
                                    <HStack alignSelf="flex-end" spacing={2}>
                                    <Text>Author: @{joke.author.username}</Text>
                                    </HStack>
                                </VStack>
                            ))
                        }
               
                  </Grid>
              </VStack>
           ) : (
               <Text>Ocorreu um erro</Text>
           )}
          
      
      </>
   
  )
}
