import {
  Flex,
  Heading,
  Icon,
  List,
  ListIcon,
  ListItem,
  Text,
  useColorModeValue,
  VStack,
} from '@chakra-ui/react'
import * as React from 'react'
import { HiCheckCircle } from 'react-icons/hi'
import { Card, CardProps } from './Card'

export interface PricingCardData {
  features: string[]
  name: string
  price: string,
  followers: string,
}

interface PricingCardProps extends CardProps {
  data: PricingCardData
  icon: React.ElementType
  button: React.ReactElement
}

export const PricingCard = (props: PricingCardProps) => {
  const { data, icon, button, ...rest } = props
  const { features, price, name, followers } = data
  const accentColor = useColorModeValue('cyan.600', 'cyan.600')
  console.log(followers);
  return (
    <Card rounded={{ sm: 'xl' }} {...rest}>
      <VStack spacing={6}>
        <Icon aria-hidden as={icon} fontSize="4xl" color={accentColor} />
        <Heading size="md" fontWeight="extrabold" color={accentColor}>
          {name}
        </Heading>
      </VStack>
      <Flex align="flex-end" justify="center" fontWeight="extrabold" color={accentColor} my="8">
        <Heading size="3xl" fontWeight="inherit" lineHeight="0.9em">
          {price}
        </Heading>
        <Text fontWeight="inherit" fontSize="2xl">
          / mes
        </Text>
      </Flex>
      <List spacing="10" mb="8" maxW="40ch" mx="auto">
        {features.map((feature, index) => (
          <>
            <ListItem fontWeight="medium" key={index} color={'blackAlpha.900'}>
              <ListIcon fontSize="xl" as={HiCheckCircle} marginEnd={2} color={accentColor} />
              {feature}
            </ListItem>
          </>
        ))}
      </List>
      {button}
    </Card>
  )
}
