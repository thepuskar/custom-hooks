import React from "react";
import { DocsThemeConfig } from "nextra-theme-docs";
import { useRouter } from "next/router";

const config: DocsThemeConfig = {
  logo: <span>@thepuskar/custom-hooks</span>,
  project: {
    link: "https://github.com/thepuskar/react-hooks",
  },
  docsRepositoryBase: "https://github.com/thepuskar/react-hooks/tree/main/docs",
  useNextSeoProps() {
    const { asPath } = useRouter();
    if (asPath !== "/") {
      return {
        titleTemplate: "%s – @thepuskar/custom-hooks",
      };
    }
  },
  footer: {
    text: "@thepuskar/custom-hooks",
  },
  editLink: {
    text: "Edit this page on GitHub →",
  },
};

export default config;
