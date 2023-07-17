import { render, fireEvent } from "@testing-library/vue";
import { createTestingPinia } from "@pinia/testing";

import Rating from "./../../src/components/Rating.vue";

describe("Rating component", () => {
  it("checks for text and clicklable elements", async () => {
    const { getByText } = render(Rating, {
      global: {
        plugins: [createTestingPinia()],
      },
    });

    getByText(/How well did we do delivering your/i);
    const clicklable = getByText("5");
    await fireEvent.click(clicklable);
  });
});
