// pages/index.tsx
import MyComponent from '../components/Mycomponents';
import {
  HomePageContainer,
  HomePageTitle,
  MyComponentContainer,
  MyComponentMessage,
} from '../styles/HomePageStyles'; // Impor styled-components

const HomePage: React.FC = () => {
  return (
    <HomePageContainer>
      <HomePageTitle>Book Store</HomePageTitle>
      <MyComponentContainer>
        <MyComponentMessage>Apa yang bisa kami bantu?</MyComponentMessage>
      </MyComponentContainer>
    </HomePageContainer>
  );
};

export default HomePage;
