import React, { useState } from 'react'
import { Box, Button, Flex, Text } from '@chakra-ui/react'

interface PaginationProps {
  currentPage: number
  totalPages: number
  onPageChange: (pageNumber: number) => void
}

const Pagination: React.FC<PaginationProps> = ({ currentPage, totalPages, onPageChange }) => {
  const [displayedPages, setDisplayedPages] = useState<number[]>([])


  React.useEffect(() => {
    const pages: number[] = []
    const totalDisplayedPages = 5

    let startPage = currentPage - Math.floor(totalDisplayedPages / 2)
    startPage = Math.max(startPage, 1)
    startPage = Math.min(startPage, Math.max(1, totalPages - totalDisplayedPages + 1))

    for (let i = 0; i < totalDisplayedPages && startPage + i <= totalPages; i++) {
      pages.push(startPage + i)
    }

    setDisplayedPages(pages)
  }, [currentPage, totalPages])

  return (
    <Flex mt={8} direction='column' alignItems={'center'}>

      <Flex>
        <Flex>
          <Button
            onClick={() => onPageChange(currentPage - 1)}
            disabled={currentPage === 1}
            mr={2}
          >
            Anterior
          </Button>
        </Flex>
        {displayedPages.map(page => (
          <Button
            key={page}
            onClick={() => onPageChange(page)}
            variant={currentPage === page ? 'solid' : 'outline'}
            colorScheme="blue"
            mr={2}
          >
            {page}
          </Button>
        ))}
        <Box>
          <Button
            onClick={() => onPageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
            ml={2}
          >
            Próximo
          </Button>
        </Box>
      </Flex>
      <Text ml={2} mt={1}>
        Página {currentPage} de {totalPages}
      </Text>

    </Flex>
  );
};

export default Pagination;
