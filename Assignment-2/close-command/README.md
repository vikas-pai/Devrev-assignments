## Demonstration

https://drive.google.com/file/d/1-ptEzK7iL5qowiyGHTcE6Uk6EWOgm3J4/view?usp=drive_link

## Usage

Click on any issue and head over to the Discussions tab. Type /close in the comment section to move the issue to the completed stage which closes the issue.

## Installation and Usage of Close Command Snap-In

This repository contains the code for the Close Command Snap-In. The Close Command Snap-In is a Snap-In that can be used to close an issue.The Snap-In is built using the DevRev CLI.


### Installation and Requirements for Snap-In Creation
#### 1. Create organisation in [Dev-org](https://app.devrev.ai/) in Devrev.ai 
#### 2. Download and Install [Devrev CLI](https://developer.devrev.ai/snap-in-development/references/install-dev-rev-cli).
#### 3. Install [jq](https://jqlang.github.io/jq/)
#### 4. Install devrev/typescript-sdk
```
npm i @devrev/typescript-sdk
```

## Getting started with snap-in's
#### 1. Create a new repository from this command.
```
devrev snap_in_version init
```
#### 2. In the new folder, "devrev-snaps-typescript-template" you can add more functions at path `src/functions` where the folder name corresponds to the function name in your manifest file.
#### 3. Each function you add will also need to be mentioned in `src/function-factory.ts` .


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


