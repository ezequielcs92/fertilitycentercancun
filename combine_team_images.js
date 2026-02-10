
const fs = require('fs');
const data = JSON.parse(fs.readFileSync('d:/fertilitycentercancun/migrating_data.json', 'utf8'));
const teamWithImages = data.team.map(member => {
    const thumbnailId = member.meta._thumbnail_id;
    const imageUrl = data.imageMap[thumbnailId];
    return {
        id: member.id,
        slug: member.slug,
        title: member.title,
        especialidad: member.meta.especialidad,
        image: imageUrl || null
    };
});
fs.writeFileSync('d:/fertilitycentercancun/team_with_images.json', JSON.stringify(teamWithImages, null, 2));
console.log(`Saved ${teamWithImages.length} specialists with images to team_with_images.json`);
