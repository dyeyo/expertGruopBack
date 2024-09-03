import axios from "axios";
import MockAdapter from "axios-mock-adapter";
import {
  getBreeds,
  getOneBreed,
  searchBreed,
} from "./../services/CatsServices";

const mock = new MockAdapter(axios);
const cats = {
  id: "abys",
  name: "Abyssinian",
  cfa_url: "http://cfa.org/Breeds/BreedsAB/Abyssinian.aspx",
};
const deails = {
  ok: true,
  images: [
    {
      id: "9x1zk_Qdr",
      url: "https://cdn2.thecatapi.com/images/9x1zk_Qdr.jpg",
      width: 1204,
      height: 1107,
    },
  ],
};
describe("Tests Cats services", () => {
  afterEach(() => {
    mock.reset();
  });

  test("getBreeds should return data", async () => {
    const mockData = [cats];
    mock.onGet(`${process.env.URL_CATS}`).reply(200, mockData);

    const data = await getBreeds();
    expect(data).toEqual(mockData);
  });

  test("getOneBreed should return data for a specific breed", async () => {
    const breed = "siamese";
    const mockData = deails;
    mock
      .onGet(`${process.env.URL_IMG}search?breed_ids=${breed}`)
      .reply(200, mockData);

    const data = await getOneBreed(breed);
    expect(data).toEqual(mockData);
  });

  test("searchBreed should return data for a specific breed", async () => {
    const breed = "persian";
    const mockData = deails;
    mock
      .onGet(`${process.env.URL_IMG}search?breed_ids=${breed}`)
      .reply(200, mockData);

    const data = await searchBreed(breed);
    expect(data).toEqual(mockData);
  });

});
