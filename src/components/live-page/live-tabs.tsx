import IndexWeightTable from "@/components/live-page/index-weight-table";

export default function LiveTabs() {
  return (
    <section id="live-tabs">
      <div className="max-w-global border-border-secondary mx-auto w-full border-x">
        <div className="py-section-md px-global">
          <IndexWeightTable />
        </div>
      </div>
    </section>
  );
}
