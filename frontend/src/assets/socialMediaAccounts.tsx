import { Icon } from "@mui/material";
import { FaTwitter, FaGithub, FaLinkedin } from "react-icons/fa";

export const socialMediaAccounts = [
    {
        name: "twitter",
        link: "https://twitter.com/melihcanclk",
        icon: <Icon component={FaTwitter} />
    },
    {
        name: "github",
        link: "https://github.com/melihcanclk",
        icon:  <Icon component={FaGithub} />
    },
    {
        name: "linkedin",
        link: "https://www.linkedin.com/in/melihcanclk/",
        icon: <Icon component={FaLinkedin} />
    }
];
