interface Book {
    id: number;
    title: string;
    description: string;
    release_year: number;
    total_page: number;
    thickness: string;
  }
  
  const MIN_RELEASE_YEAR = 1980;
  const MAX_RELEASE_YEAR = 2021;
  
  type Thickness = 'tipis' | 'sedang' | 'tebal';
  
  const calculateThickness = (totalPage: number): Thickness => {
    if (totalPage <= 100) {
      return 'tipis';
    } else if (totalPage >= 101 && totalPage <= 200) {
      return 'sedang';
    } else {
      return 'tebal';
    }
  };
  
  export const validateAndConvertBookProps = (props: Omit<Book, 'thickness'>): Book => {
    const { release_year, total_page, ...restProps } = props;
  
    // Validasi release_year
    if (release_year < MIN_RELEASE_YEAR || release_year > MAX_RELEASE_YEAR) {
      throw new Error(`Invalid release year. It should be between ${MIN_RELEASE_YEAR} and ${MAX_RELEASE_YEAR}`);
    }
  
    // Konversi thickness berdasarkan total_page
    const thickness: Thickness = calculateThickness(total_page);
  
    // Mengembalikan objek buku dengan properti yang valid dan terkonversi
    return {
      release_year,
      total_page,
      thickness,
      ...restProps,
    };
  };
  