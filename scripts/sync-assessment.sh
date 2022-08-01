#!/bin/bash
set -eou pipefail

LOCAL_BASE_BRANCH="skeleton"
LOCAL_REMOTE_BRANCH="hiring-public"

REMOTE_REPO="hiring-public"
REMOTE_BRANCH="main"

function cleanup {
    echo "Removing existing remote '${REMOTE_REPO}'..."
    git remote remove ${REMOTE_REPO} || true

    echo "Removing existing branch '${LOCAL_REMOTE_BRANCH}'..."
    git branch -D ${LOCAL_REMOTE_BRANCH} || true
}
cleanup

echo "Checing out local branch '${LOCAL_BASE_BRANCH}'..."
git checkout ${LOCAL_BASE_BRANCH}

echo "Adding remote '${REMOTE_REPO}'..."
git remote add ${REMOTE_REPO} git@github.com:hivehr/${REMOTE_REPO}.git

echo "Checking out '${REMOTE_REPO}@${REMOTE_BRANCH}' to '${LOCAL_REMOTE_BRANCH}'..."
git fetch ${REMOTE_REPO} ${REMOTE_BRANCH}:${LOCAL_REMOTE_BRANCH}
git checkout ${REMOTE_REPO}

echo "Merging '${LOCAL_BASE_BRANCH}' onto local branch '${LOCAL_REMOTE_BRANCH}'..."
git merge --allow-unrelated-histories -X ours --squash ${LOCAL_BASE_BRANCH}
git commit --allow-empty -m "chore: update to latest assessment code"

echo "Pushing '${LOCAL_REMOTE_BRANCH}' to '${REMOTE_REPO}:${REMOTE_BRANCH}'..."
git push --set-upstream ${REMOTE_REPO} ${LOCAL_REMOTE_BRANCH}:${REMOTE_BRANCH}

echo "Checking out 'master'..."
git checkout main

echo "Cleaning up"
cleanup
