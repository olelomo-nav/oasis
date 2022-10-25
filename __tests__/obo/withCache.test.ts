import { OboProvider } from "../../lib";
import { withCache } from "../../lib/obo/withCache";
import { token } from "../__utils__/test-provider";

describe("withCache", () => {
  it("caches token + audience", async () => {
    const oboProvider: OboProvider = async (_, audience) =>
      await token(audience);
    const cachedProvider = withCache(oboProvider);
    const obo1 = await cachedProvider("token1", "audience");
    const obo2 = await cachedProvider("token1", "audience");
    const obo3 = await cachedProvider("token2", "audience");

    expect(obo1).not.toBeNull();
    expect(obo2).not.toBeNull();
    expect(obo1).toEqual(obo2);
    expect(obo3).not.toBeNull();
    expect(obo1).not.toEqual(obo3);
  });

  it("does not cache when expire-time is close to tolerance", async () => {
    const oboProvider: OboProvider = async (_, audience) =>
      await token(audience, { expirationTime: "30s" });
    const cachedProvider = withCache(oboProvider, { minExpire: 45 });
    const obo1 = await cachedProvider("token3", "audience");
    const obo2 = await cachedProvider("token3", "audience");

    expect(obo1).not.toEqual(obo2);
  });
});
