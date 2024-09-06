import { useTranslations } from "next-intl";

export default function Home() {
  const t = useTranslations("IndexPage");

  // Ürün anahtarlarını tanımlayın
  const productKeys = ["product1", "product2", "product3"];

  return (
    <div>
      <h1 className="text-4xl mb-4 font-semibold">{t("title")}</h1>
      <p>{t("description")}</p>

      {/* Ürünleri döngüye sokarak yazdır */}
      <div className="mt-8">
        {productKeys.map((productKey) => (
          <div key={productKey} className="mb-4">
            <h2 className="text-2xl font-bold">{t(`products.${productKey}.name`)}</h2>
            <p>{t(`products.${productKey}.description`)}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
