import fs from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import path from 'node:path';
import ts from 'typescript';

const scriptDir = path.dirname(fileURLToPath(import.meta.url));
const projectRoot = path.resolve(scriptDir, '..');
const sourcePath = path.join(projectRoot, 'app/components/exobase/ExobaseData.ts');
const outputPath = path.join(projectRoot, 'exobase.txt');

async function loadPageData() {
    const source = await fs.readFile(sourcePath, 'utf8');
    const transpiled = ts.transpileModule(source, {
        compilerOptions: {
            module: ts.ModuleKind.ES2022,
            target: ts.ScriptTarget.ES2022,
        },
    }).outputText;

    const moduleUrl = `data:text/javascript;charset=utf-8,${encodeURIComponent(transpiled)}`;
    const module = await import(moduleUrl);
    return module.pageData;
}

function replaceWikiLinks(value) {
    return value.replace(/\[\[(.*?)(?:~(.*?))?]]/g, (_, displayName) => displayName.trim());
}

function formatArticleContent(content) {
    const lines = content.split(/\r?\n/);
    const output = [];
    let inCodeBlock = false;

    for (const rawLine of lines) {
        const line = replaceWikiLinks(rawLine).trimEnd();

        if (line === '$$$' || line === '%%%') {
            output.push('```');
            inCodeBlock = !inCodeBlock;
            continue;
        }

        if (inCodeBlock) {
            output.push(replaceWikiLinks(rawLine));
            continue;
        }

        if (line.startsWith('# ')) {
            output.push(line.slice(2));
            output.push('');
            continue;
        }

        if (line.startsWith('- ')) {
            output.push(`* ${line.slice(2)}`);
            continue;
        }

        output.push(line);
    }

    return output.join('\n').replace(/\n{3,}/g, '\n\n').trim();
}

function buildExport(pageData) {
    const grouped = new Map();

    for (const [slug, entry] of pageData.entries()) {
        const category = entry.classification.split('/')[0];
        const articles = grouped.get(category) ?? [];
        articles.push([slug, entry]);
        grouped.set(category, articles);
    }

    const sections = Array.from(grouped.entries())
        .sort(([left], [right]) => left.localeCompare(right))
        .map(([category, articles]) => {
            const body = articles
                .sort(([left], [right]) => left.localeCompare(right))
                .map(([slug, entry]) => {
                    const lines = [
                        slug,
                        `Classification: ${entry.classification}`,
                    ];

                    if (entry.caption) {
                        lines.push(`Caption: ${entry.caption}`);
                    }

                    lines.push('');
                    lines.push(formatArticleContent(entry.content));

                    return lines.join('\n').trim();
                })
                .join('\n\n' + '-'.repeat(80) + '\n\n');

            return `# ${category}\n\n${body}`;
        });

    return `Sightseer Exobase Export\n\n${sections.join('\n\n')}\n`;
}

const pageData = await loadPageData();
const output = buildExport(pageData);

await fs.writeFile(outputPath, output, 'utf8');
console.log(`Wrote ${outputPath}`);
