# Certificate & Credential Images

Place your official credential badge images or certificate PNG/SVG files in this directory.

## Recommended Image Slots

- **`cka.png`**: Certified Kubernetes Administrator badge (CNCF / Linux Foundation)
- **`terraform.png`**: HashiCorp Certified: Terraform Associate badge
- **`aws-devops.png`**: AWS Certified DevOps Engineer - Professional badge
- **`azure-devops.png`**: Microsoft Certified: DevOps Engineer Expert badge

## How It Works

The About page (`/about`) automatically checks if the image exists in this folder:
- **If the file is present**: It renders an image thumbnail with click-to-enlarge preview.
- **If the file is not yet present**: It seamlessly falls back to the official high-resolution technology logo (`kubernetes`, `terraform`, `aws`, `azure`) inside an elegant badge container.

## Best Practice Note

For professional portfolios, square badge PNGs/SVGs (from Credly, Microsoft Learn, or CNCF) at `512x512` or `256x256` look significantly sharper and cleaner than full-page diploma document scans. The official "Verify" button directly links recruiters to the cryptographically verified registry record.
