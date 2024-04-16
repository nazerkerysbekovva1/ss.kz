
const { spawn } = require('child_process');


const getJobRecommendations = async (req, res) => {
    // Получите данные о резюме из запроса
    const position = req.body.position;
    console.log('position', position)

    let outputData = '';

    var childPython = spawn('c:\\Users\\nazer\\anaconda3\\python.exe', ['C:\\Users\\nazer\\downloads\\hh.kz\\recommender\\main.py', position])

    childPython.stdout.on('data', function (data) {
        console.log("Python script output:", data.toString());
        outputData += data.toString();
    });

    childPython.stderr.on('data', (data) => {
        console.error('Python script error:', data.toString());
    });

    childPython.on('close', (code) => {
        console.log("child process exited with code", code);
        if (code === 0) {
            // Parse the entire data string as JSON
            const recommendations = JSON.parse(outputData);
            res.json(recommendations);
        } else {
            res.status(500).json({ error: `Python script failed with code ${code}` });
        }
    });
};

function compareStrings(s1, s2) {
    let longer = s1;
    let shorter = s2;
    if (s1.length < s2.length) {
        longer = s2;
        shorter = s1;
    }
    let longerLength = longer.length;
    if (longerLength === 0) {
        return 1.0;
    }
    let matchCount = 0;
    for (let i = 0; i < longerLength; i++) {
        if (longer[i] === shorter[i]) {
            matchCount++;
        }
    }
    return (matchCount / longerLength);
}
// Функция для расчета показателя соответствия резюме к вакансии
const calculateMatchScore = async (req, res) => {
    const resume = req.body.resume;
    const vacancy = req.body.vacancy;

    // let matchCount = 0;
    // let totalLength = 0;

    // // Сравниваем название вакансии и должность в резюме
    // matchCount += compareStrings(resume.position.toLowerCase(), vacancy.name.toLowerCase());
    // totalLength += Math.max(resume.position.length, vacancy.name.length);

    // // Сравниваем описание вакансии и область деятельности в резюме
    // matchCount += compareStrings(vacancy.description.toLowerCase(), resume.about.toLowerCase());
    // totalLength += Math.max(vacancy.description.length, resume.about.length);

    // // Сравниваем ключевые навыки
    // const resumeSkills = resume.skills.toLowerCase().split(',');
    // const vacancySkills = vacancy.skills.toLowerCase().split(',');
    // resumeSkills.forEach(skill => {
    //     vacancySkills.forEach(vacancySkill => {
    //         matchCount += compareStrings(skill.trim(), vacancySkill.trim());
    //         totalLength += Math.max(skill.trim().length, vacancySkill.trim().length);
    //     });
    // });

    // // Сравниваем города
    // matchCount += (resume.cityId === vacancy.cityId) ? 1 : 0;
    // totalLength += 1;

    // // соответствия по типу занятости
    // matchCount += (resume.employmentTypes[0].id === vacancy.employmentTypeId) ? 1 : 0;
    // totalLength += 1;

    // // Возвращаем процент совпадения
    // const result = (matchCount / totalLength) * 100;
    // res.json({ matchScore: `${result.toFixed()}%` });

    let matchScore = 0;
    let totalWeight = 0;

    // Функция для сравнения строк с использованием коэффициента Жаккара
    const calculateJaccardSimilarity = (str1, str2) => {
        const set1 = new Set(str1.toLowerCase().split(',').map(s => s.trim()));
        const set2 = new Set(str2.toLowerCase().split(',').map(s => s.trim()));
        const intersection = new Set([...set1].filter(x => set2.has(x)));
        const union = new Set([...set1, ...set2]);
        return intersection.size / union.size;
    };

    // Сравниваем название вакансии и должность в резюме
    matchScore += calculateJaccardSimilarity(resume.position, vacancy.name) * 20;
    totalWeight += 20;

    // Сравниваем описание вакансии и область деятельности в резюме
    matchScore += calculateJaccardSimilarity(resume.about, vacancy.description) * 30;
    totalWeight += 30;

    // Сравниваем ключевые навыки
    matchScore += calculateJaccardSimilarity(resume.skills, vacancy.skills) * 30;
    totalWeight += 30;

    // Сравниваем города
    if (resume.cityId === vacancy.cityId) {
        matchScore += 10;
        totalWeight += 10;
    }

    // Соответствия по типу занятости
    if (resume.employmentTypes.some(type => type.id === vacancy.employmentTypeId)) {
        matchScore += 10;
        totalWeight += 10;
    }

    // Возвращаем общий показатель соответствия
    const result = (matchScore / totalWeight) * 100;
    res.json({ matchScore: `${result.toFixed()}%` });

}


module.exports = {
    getJobRecommendations,
    calculateMatchScore
}