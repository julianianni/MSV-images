import React, { useEffect, useState } from 'react'
import { Box } from './Box'
import styled from 'styled-components'
import axios from 'axios'
import { get, isEmpty } from 'lodash/fp'
import { CATEGORIES_URL, TOTAL_TAKE, PRODUCTS_PER_CATEGORY } from '../constants'

const Container = styled.div`
  animation: scroll 70s linear infinite;
  background: url('https://images.unsplash.com/photo-1505506874110-6a7a69069a08?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80'),
    #111111;
  color: #eee;
  min-height: 100vh;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  perspective: 1000px;
  perspective-origin: 50% 50%;
  overflow: hidden;

  @keyframes scroll {
    100% {
      background-position: 0px -3000px;
    }
  }

  @media (prefers-reduced-motion) {
    .wrapper {
      animation: scroll 200s linear infinite;
    }
  }

  @media (min-width: 670px) {
    .title {
      font-size: 5rem;
    }
  }
`

const CategoriesContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  padding: 1rem;
  min-width: 80vw;
  max-width: 80vw;
`

export interface IProducts {
  id: string
  name: string
  url: string
  logo: string
}

export interface ICategory {
  products: IProducts[]
  name: string
  id: string
}

const StyledArrow = styled.span`
  border-radius: 5px;
  border: none;
  background: none;
  font-size: 80px;
  margin: 10px;
  cursor: pointer;
`

const SubContainer = styled.div`
  margin-top: 20px;
  display: flex;
  align-items: center;
`

const generateURL = ({
  url,
  currentPage,
}: {
  url: string
  currentPage: number
}): string => {
  const page = `&page=${currentPage}`
  const totalTake = `&take=${TOTAL_TAKE}`
  const productsPerCategory = `&includeProducts=${PRODUCTS_PER_CATEGORY}`
  return url + totalTake + page + productsPerCategory
}

export const Main = () => {
  const [categories, setCategories] = useState<ICategory[]>([])
  const [currentPage, setCurrentPage] = useState(1)
  const [totalPages, setTotalPages] = useState(1)
  const [isLoading, setIsLoading] = useState(false)

  const getProducts = async (url: string) => {
    setIsLoading(true)
    const categoriesFetched = await axios
      .get(url)
      .then(get('data'))
      .catch((e) => {
        throw new Error('failed to fetch products')
      })
      .finally(() => setIsLoading(false))
    if (isEmpty(categoriesFetched)) return
    setTotalPages(categoriesFetched?.meta?.pageCount ?? 1)
    setCategories(categoriesFetched?.data ?? [])
  }

  const handleNext = () => {
    if (totalPages === currentPage) setCurrentPage(1)
    else setCurrentPage((prevPage) => prevPage + 1)
  }
  const handlePrevious = () => {
    if (currentPage === 1) setCurrentPage(totalPages)
    else setCurrentPage((prevPage) => prevPage - 1)
  }

  useEffect(() => {
    getProducts(generateURL({ url: CATEGORIES_URL, currentPage }))
  }, [currentPage])

  return (
    <Container>
      {isLoading ? (
        <p>loading....</p> //this should be a  spinner or similar, simplyfing for example purpose
      ) : (
        <SubContainer>
          <StyledArrow onClick={() => handlePrevious()}>{'<'}</StyledArrow>
          <CategoriesContainer>
            {categories.map((category) => (
              <Box key={category.id} category={category} />
            ))}
          </CategoriesContainer>
          <StyledArrow onClick={() => handleNext()}>{'>'}</StyledArrow>
        </SubContainer>
      )}
    </Container>
  )
}
