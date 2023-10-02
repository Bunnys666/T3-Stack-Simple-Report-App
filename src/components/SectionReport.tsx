/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { Card, Text, SimpleGrid, UnstyledButton, Group } from "@mantine/core";
import {
  IconReport,
  IconReceipt,
  IconRepeat,
  IconReceiptRefund,
  IconReceiptTax,
  IconCoin,
  IconCashBanknote,
  IconChartBar,
} from "@tabler/icons-react";
import classes from "@/styles/ActionsGrid.module.css";
import Link from "next/link";

const mockdata = [
  {
    title: "Create Reports",
    icon: IconReport,
    color: "teal",
    link: "/report/create",
  },
  {
    title: "All Reports",
    icon: IconReceipt,
    color: "indigo",
    link: "report/",
  },
  { title: "Analytics", icon: IconChartBar, color: "indigo", link: "" },
  { title: "Transfers", icon: IconRepeat, color: "blue", link: "" },
  { title: "Refunds", icon: IconReceiptRefund, color: "green", link: "" },
  { title: "Receipts", icon: IconReceipt, color: "teal", link: "" },
  { title: "Taxes", icon: IconReceiptTax, color: "cyan", link: "" },

  { title: "Payments", icon: IconCoin, color: "red", link: "" },
  { title: "Cashback", icon: IconCashBanknote, color: "orange", link: "" },
];

export function ActionsGrid() {
  const items = mockdata.map((item) => (
    <>
      <UnstyledButton key={item.title} className={classes.item}>
        <Link href={item.link}>
          <item.icon size="2rem" />
          <Text size="md" mt={2}>
            {item.title}
          </Text>
        </Link>
      </UnstyledButton>
    </>
  ));

  return (
    <Card withBorder radius="md" className={classes.card}>
      <Group justify="space-between">
        <Text className={classes.title}>Services</Text>
      </Group>
      <SimpleGrid cols={3} mt="md">
        {items}
      </SimpleGrid>
    </Card>
  );
}
