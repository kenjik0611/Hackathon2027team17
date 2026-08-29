(function () {
  const store = window.OtokogokoroResultStore;

  if (!store) {
    return;
  }

  const aggregate = store.getAggregate();
  const summaryElement = document.getElementById("insight-progress-summary");
  const noteElement = document.getElementById("insight-progress-note");
  const memberPhotoBasePath = "assets/member-photos";
  const memberPhotoExtensions = ["jpg", "jpeg", "png", "webp", "JPG", "JPEG", "PNG", "WEBP"];
  const memberPhotoFolders = {
    arita: "有田",
    kiyose: "清瀬",
    suzuki: "鈴木",
    kudo: "工藤",
    fukazawa: "深澤"
  };
  const memberPhotoFiles = {
    arita: "有田/Arita.jpg",
    kiyose: "清瀬/IMG_1298.JPG",
    suzuki: "鈴木/selfphoto.jpg",
    kudo: "工藤/0A004F10-99F3-434A-A524-D6D81D02BD60_1_105_c.jpeg",
    fukazawa: "深澤/pic.2025.jpg"
  };

  function loadMemberPhoto(image) {
    const memberId = image.dataset.memberPhoto;
    const explicitFile = image.dataset.memberPhotoFile || memberPhotoFiles[memberId];
    if (!memberId && !explicitFile) {
      return;
    }

    const memberFolder = memberPhotoFolders[memberId];
    if (!memberFolder && !explicitFile) {
      return;
    }

    const candidates = [
      ...(explicitFile ? [`${memberPhotoBasePath}/${explicitFile}`] : []),
      ...(memberFolder ? memberPhotoExtensions.map((extension) => `${memberPhotoBasePath}/${memberFolder}/profile.${extension}`) : [])
    ];
    let currentIndex = 0;

    image.onerror = () => {
      currentIndex += 1;
      if (currentIndex >= candidates.length) {
        image.onerror = null;
        image.src = `${memberPhotoBasePath}/member-placeholder.svg`;
        return;
      }

      image.src = candidates[currentIndex];
    };

    image.src = candidates[currentIndex];
  }

  document.querySelectorAll("[data-member-photo]").forEach(loadMemberPhoto);

  if (summaryElement) {
    summaryElement.textContent = `${aggregate.completedCount} / ${aggregate.totalMembers}人 完了`;
  }

  if (noteElement) {
    noteElement.textContent = aggregate.completedCount > 0
      ? `総合一致度 ${aggregate.overallMatchPercent}% / 未プレイ ${aggregate.incompleteMembers.length}人`
      : "一致度はメンバーごとに保存されます";
  }

  document.querySelectorAll(".scene-card[data-member-id]").forEach((card) => {
    const memberId = card.dataset.memberId;
    const statusElement = card.querySelector(`[data-member-status="${memberId}"]`);
    const result = aggregate.memberResults[memberId];
    const progress = aggregate.memberProgress ? aggregate.memberProgress[memberId] : null;

    if (!statusElement) {
      return;
    }

    card.classList.remove("is-complete", "is-progress", "is-incomplete");
    statusElement.classList.remove("is-complete", "is-progress");

    if (result && result.isComplete) {
      card.classList.add("is-complete");
      statusElement.classList.add("is-complete");
      statusElement.textContent = "完了";
      statusElement.title = `一致度 ${result.matchPercent ?? 0}%`;
      statusElement.setAttribute("aria-label", `完了。一致度 ${result.matchPercent ?? 0}%`);
      return;
    }

    if (progress && progress.answeredCount > 0) {
      card.classList.add("is-progress");
      statusElement.classList.add("is-progress");
      statusElement.textContent = "途中";
      statusElement.title = `${progress.answeredCount} / ${progress.questionCount || "?"}問 回答済み`;
      statusElement.setAttribute("aria-label", `途中。${progress.answeredCount} / ${progress.questionCount || "?"}問 回答済み`);
      return;
    }

    card.classList.add("is-incomplete");
    statusElement.textContent = "未完了";
    statusElement.title = "まだ回答していません";
    statusElement.setAttribute("aria-label", "未完了。まだ回答していません");
  });
})();
