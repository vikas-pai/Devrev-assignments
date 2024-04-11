## Installation and Usage of Close Command Snap-In

This repository contains the code for the Close Command Snap-In. The Close Command Snap-In is a Snap-In that can be used to close an issue.The Snap-In is built using the DevRev CLI.

### Authentication

Run this command to authenticate to the Devrev CLI:

```
devrev profiles authenticate --org <DevOrg-slug-name> --usr <your-email@example.com>

```

### Packaging the Code

Run this command to package the code:

```
npm install
npm run build
npm run package

```

### Creation of a snap-in package

Once you have packed the code, you can create a snap-in package by running the following command:

```
devrev snap_in_package create-one --slug <slug name>

```

The above command will create a snap-in package with the given unique slug name.

### Creation of a snap-in version

After creating a snap-in package, you can create a snap-in version by running the following command:

```
devrev snap_in_version create-one --manifest ../manifest.yaml --archive build.tar.gz | jq .

```

### Creation of a snap-in draft

After creating a snap-in version, you can create a snap-in draft by running the following command:

```
devrev snap_in draft --snap_in_version [snap-in-version-id]

```

After exection of all the above commands, head over to the Snap-In section in the Settings toolbar of the DevRev UI to see the newly created Snap-In.Install the Snap-In. After the installation, click on any issue and head over to the Discussions tab. Type /close in the comment section to close the issue.

### Demonstration

https://drive.google.com/file/d/1fJJOwWSjFDKp-K-qw3LHuKIpnjOzOY7r/view?usp=drive_link
